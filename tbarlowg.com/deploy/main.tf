variable "gcp_project_id" {
  type = string
}

provider "google" {
  project = var.gcp_project_id
  region  = "europe-west1"
}

resource "google_cloud_run_v2_service" "default" {
  name                = "tbarlowg"
  location            = "europe-west1"
  deletion_protection = false
  ingress             = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "europe-west1-docker.pkg.dev/${var.gcp_project_id}/api/latest"
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
  location = google_cloud_run_v2_service.default.location
  project  = google_cloud_run_v2_service.default.project
  service  = google_cloud_run_v2_service.default.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
