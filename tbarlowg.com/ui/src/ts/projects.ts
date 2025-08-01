import { Project } from '@tbg/types'

export const projects: Project[] = [
  {
    gifURI: 'ANewTomorrow.gif',
    imageURI: 'ANewTomorrow.png',
    description: 'A New Tomorrow is an action-stealth first-person shooter where the player is a robot tasked to destroy a robot factory. The user has a mysterious voice guiding them through the level the voice goes by the code name M. One of my roles in this project was implement any UI design documents given to me by the game designers. I found following a design document when creating the UI challenging as my interpretation of the document sometimes varied from designers intentions. However, as I started to understand the designers\' intentions II found I could produce work much faster and with fewer errors/misinterpretations. I also created an AI hacking minigame using C++ that would recognise patterns in the user\'s behaviour and use that to increase the challenge of the minigame\n',
    links: [],
    title: 'A New Tomorrow',
  },
  {
    description: 'During the summer after my first year at Falmouth University, a fellow student and I developed a mobile game called Battle Screens. The game was made in Unreal Engine 4 (UE4). On this project, I worked as a games programmer using both C++ and blueprints.',
    links: [],
    title: 'Battle Screens App',
    gifURI: 'BattleScreens.gif',
    imageURI: 'BattleScreens.jpg',
  },
  {
    imageURI: 'DayNez.jpg',
    description: 'DayNeZ is a wave-based zombie survival game written in 6502 Assembler for the NES. DayNeZ is inspired by DayZ in so far as it has zombies that you shoot. This project was part of one of my modules at Falmouth University that spanned 3 months. Learning 6502 was a particular challenge as it was the first time I wrote in a programming language where the main focus was not on OOP. I found programming in assembler difficult at first but as my understanding deepened so to did my enjoyment of working so close to the metal.',
    title: 'Daynez-6502 Assembler',
    gifURI: 'DayNeZ.gif',
    links: [
      {
        link: 'https://github.com/TristanBarlow/DayNeZ---6502-Assembler',
        label: 'GitHub',
      },
    ],
  },
  {
    gifURI: 'RTS.gif',
    imageURI: 'RTS.png',
    description: 'In this project,  I was tasked to create a bot for the real-time strategy game called MicroRTS. MicroRTS is written in Java and the way in which user bots were integrated meant the bots had to be written in Java also. The bot I wrote used a two-layered Monte Carlo Tree Search algorithm it achieved a moderate amount of success when compared with the sample bots provided. One rule required the bots to make a move within 100ms. The algorithm I wrote gave back better results the more time it had to run, I found optimising the algorithm often resulted in a large improvement in performance. I often found it frustrating to determine whether or not changes made to the bot actually improved the performance of the bot.',
    links: [
      {
        link: 'https://github.com/TristanBarlow/MicroRTS_BOT',
        label: 'Github',
      },
    ],
    title: 'Microrts Bot',
  },
  {
    description: 'In this project, I created a client-server application in the form of a Multi-User Dungeon. On the server-side, the MUD was made in C# running on a Digital Ocean server with Ubuntu as its operating system. I used SQLite for the database API to store all of the users\' data and the state of the dungeon. All of the messages between the server and the client were encrypted and all passwords were salted and encrypted before being stored. The client was also written in C# using WinForms as the UI API.',
    title: 'Multi User Dungeon',
    gifURI: 'MUD.gif',
    imageURI: 'MUD.png',
    links: [
      {
        link: 'https://github.com/TristanBarlow/Multi-User-Dungeon',
        label: 'Github',
      },
    ],
  },
  {
    description: 'Pocket Pals is an educational, geolocation mobile app for children, with a similar game loop to Pokémon Go, and is available for iOS and Android platforms, developed by a mixed team of environmental scientists and animators. I was responsible for co-developing both the client and server components of the service. The server was developed around Google’s Firebase, whilst the client used Unity 2018.2 /C#. My main responsibility for client development was to handle the creation of the game environment. The game used geolocation data to accurately place characters and as a seed in the procedural generation of content. The virtual world used Mapbox to provide image data for the map. ',
    title: 'Pocket Pals App',
    gifURI: 'PPALS.gif',
    imageURI: 'PocketPals.png',
    links: [
      {
        link: 'https://itunes.apple.com/gb/app/pocket-pals/id1419904479',
        label: 'Apple Store',
      },
      {
        link: 'https://play.google.com/store/apps/details?id=com.pocket.pals',
        label: 'Play Store',
      },
    ],
  },
  {
    description: 'This is a passion projected where I design and create bots that play chess. All of the bots are written in JavaScript and I am using the chess.js library to provide the chess engine and I am using chessboard.js to provide the visual interface. The project allows you to put bot against bot or try your own skill against the bots I have made. I will be continuing to add bots to this project in the hopes that eventually I have a large portfolio of chess AIs.',
    links: [
      {
        link: 'https://tristanbarlowgriffin.co.uk/chess',
        label: 'Live',
      },
    ],
    title: 'Portfolio Of Chess Ai',
    imageURI: 'Chess.png',
    gifURI: 'Chess.gif',
  },
  {
    gifURI: 'WITM.gif',
    description: '‘What is that meat?’ is a third person hack and slash dungeon crawler made in Unreal Engine 4 (UE4). What is that meat was my final year group project game, it was developed over 8 months. For this project, I took on the role of scrum master as well as technical lead.  The team consisted of 8 people My responsibilities as a scrum master required me to organise daily standups for a team of 7 people. In addition, I hosted and organised the sprint retrospectives. As the scrum master, I faced the challenge of  accommodating the differing work routines of my teammates. I overcame this challenge by making the daily standup times flexible and promoting the use of recorded/skyped standups. In my role as the technical lead, I was responsible for designing the class hierarchy for most of the key elements. Using my knowledge of c++ I created a procedural content generation(PCG) algorithm that created the levels the user played. In addition, I made a  dev tool that allowed the game designers in my team to create and test prototype levels in a web browser.',
    links: [],
    title: 'What Is That Meat',
    imageURI: 'WITH.png',
  },
]
