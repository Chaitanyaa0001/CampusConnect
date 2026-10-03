export const ROUTING_KEY = {
  // Auth
  EMAIL_VERIFICATION: "auth.email_verification", // for sending email
  USER_EMAIL_VERIFIED: "auth.user_email_verified", // after verification so to create user in userdb

  // Carpool
  CARPOOL_CREATED: "carpool.ride_created",
  CARPOOL_DELETED: "carpool.ride_deleted",

  // Car Rental
  CAR_RENTAL_CREATED: "car_rental.created",
  CAR_RENTAL_DELETED: "car_rental.deleted",

  // Project
  PROJECT_CREATED: "project.created",
  PROJECT_DELETED: "project.deleted",

  // Lost & Found
  LOST_FOUND_CREATED: "lost_found.created",
  LOST_FOUND_DELETED: "lost_found.deleted",

  // Dead Letter
  EMAIL_DLQ: "email.dead",
  USER_DLQ: "user.dead",
  CARPOOL_DLQ: "carpool.dead",
  PROJECT_DLQ: "project.dead",
  LOST_FOUND_DLQ: "lost_found.dead",
} as const;