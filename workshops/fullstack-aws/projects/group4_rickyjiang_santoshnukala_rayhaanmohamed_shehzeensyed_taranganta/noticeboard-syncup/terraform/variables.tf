variable "student_prefix" {
  description = "Prefix applied to every AWS resource name (assignment naming requirement)"
  type        = string
  default     = "student-ricky-jiang"
}

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type for the backend"
  type        = string
  default     = "t3.micro"
}

variable "ssh_public_key_path" {
  description = "Path to the local SSH public key used for EC2 access"
  type        = string
  default     = "~/.ssh/id_ed25519.pub"
}
