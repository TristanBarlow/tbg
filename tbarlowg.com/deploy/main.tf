variable "gcp_project_id" {
  type = string
}

variable "api_image_revision" {
  type = string
}


provider "google" {
  project = var.gcp_project_id
  region  = "europe-west1"
}


terraform {
  backend "gcs" {
    bucket = "tb-personal-tf-state"
    prefix = "api/state"
  }
}

resource "google_cloud_run_v2_service" "tbarlowg" {
  name                = "tbarlowg"
  location            = "europe-west1"
  deletion_protection = false
  ingress             = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "europe-west1-docker.pkg.dev/${var.gcp_project_id}/api/${var.api_image_revision}"
      resources {
        limits = {
          cpu    = "1"
          memory = "2Gi"
        }
      }
    }
  }

}


data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_v2_service.tbarlowg.location
  project  = google_cloud_run_v2_service.tbarlowg.project
  service  = google_cloud_run_v2_service.tbarlowg.name

  policy_data = data.google_iam_policy.noauth.policy_data
}


resource "google_cloud_run_domain_mapping" "tbarlowg" {
  location = "europe-west1"
  name     = "tbarlowg.com"
  metadata {
    annotations = {}
    labels      = {}
    namespace   = var.gcp_project_id
  }
  spec {
    certificate_mode = "AUTOMATIC"
    force_override   = false
    route_name       = google_cloud_run_v2_service.tbarlowg.name
  }
}
