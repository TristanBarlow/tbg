import { useEffect, useState } from 'react'
import { apiRequest } from '../ts/request'
import { Project, ProjectLink } from '@tbg/types'
import InputField from './InputField'
import { Flex } from '@chakra-ui/react'
import Button from './Button'

interface LinkInputProps {
  value: ProjectLink
  update: (v: ProjectLink | null) => void
}
function LinkInput({ value, update }: LinkInputProps) {
  const { label, link } = value
  return (
    <Flex mt={2} w="100%" h="100%" alignItems="flex-end">
      <InputField label="Label" value={label} change={x => update({ ...value, label: x })} />
      <InputField label="Link" value={link} change={x => update({ ...value, link: x })} />
      <Button label="X" click={() => update(null)} />
    </Flex>
  )
}

const defaultProje: Project = {
  description: '',
  gifId: '',
  imageId: '',
  links: [],
  order: 100,
  title: '',
}
interface Props {
  proj: Project | null
  close: () => void
}
export default function ProjectAdd(props: Props) {
  const [project, setProject] = useState(props.proj || { ...defaultProje })

  useEffect(() => {
    setProject(props.proj || { ...defaultProje })
  }, [props.proj])

  function update(u: Partial<Project>) {
    setProject({ ...project, ...u })
  }

  async function submit(): Promise<void> {
    await apiRequest(`/api/projects/create`, 'POST', project)
    props.close()
  }

  function updateLink(i: number, link: ProjectLink | null) {
    if (!link) {
      project.links.splice(i, 1)
    }
    else {
      project.links[i] = link
    }
    update({ links: [...project.links] })
  }

  function addLink() {
    project.links.push({ label: '', link: '' })
    update({ links: [...project.links] })
  }

  return (
    <div className="modal is-active" style={{ width: '100vw', height: '100vh', position: 'fixed', zIndex: 1000 }}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-white" style={{ border: 'none' }}>
          <p className="modal-card-title">Making Project</p>
          <i className="button material-icons is-danger is-size-6" onClick={() => props.close()}>close</i>
        </header>
        <Flex flexDir="column" w="100%" className="modal-card-body">
          <InputField label="Title" value={project.title} change={x => update({ title: x })} />
          <div className="field">
            <p className="label">Description</p>
            <textarea
              value={project.description}
              onChange={x => update({ description: x.target.value })}
              className="textarea"
            />
          </div>
          <InputField label="Image ID" value={project.imageId} change={x => update({ imageId: x })} />
          <InputField label="Gif ID" value={project.gifId} change={x => update({ gifId: x })} />
          <InputField label="Order" type="number" value={project.order.toString()} change={x => update({ order: parseInt(x) })} />
          <Button w="fit-content" mt={2} click={addLink} label="Add Link" />
          <Flex flexDir="column">
            {
              project.links.map((link, i) => (
                <LinkInput key={i} update={v => updateLink(i, v)} value={link} />
              ))
            }
          </Flex>
        </Flex>
        <footer className="modal-card-foot has-background-white" style={{ border: 'none' }}>
          <button onClick={() => submit()} className="button is-primary">SUBMIT</button>
        </footer>
      </div>
    </div>
  )
}
