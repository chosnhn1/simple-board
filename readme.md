# Simple Board

Messageboard featuring:

* CRUD messages via django REST API

## Service Architecture

* REST API Backend
  * django Backend server: [Django](https://docs.djangoproject.com/en/5.1/)
  * django REST Framework: [Django REST Framework](https://www.django-rest-framework.org/)
* Database:
* Web Frontend: [React](https://react.dev/)
* Deploy:

## Features

* CRUD articles & comments with API requests
* Accounts management

## ERD

* user
* article
  * title
  * author
  * contents
  * is_notice
  * created_at & modified_at
  * tags
* comment
  * author
  * contents

## Specifications

* User
  * Create: Signup
  * Retrieve: User Profile
    * access user's articles and comments
  * Update: edit user info
  * Delete: Delete account
* Article
  * Create: write article
  * Retrieve: read article, both list and detailed
  * Update: update article
  * Delete: delete article
  * Commenting
    * Create and Delete article-related comments
* Additionals
  * add user permission: moderators
    * can write notices, delete (or making flags) other articles
