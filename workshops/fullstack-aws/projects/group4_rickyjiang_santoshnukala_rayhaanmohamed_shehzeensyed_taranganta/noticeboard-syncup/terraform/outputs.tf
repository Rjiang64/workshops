output "cloudfront_url" {
  description = "HTTPS URL for the frontend, served via CloudFront"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (needed for cache invalidation in CI)"
  value       = aws_cloudfront_distribution.frontend.id
}
