![General Assembly Logo](http://i.imgur.com/ke8USTq.png)

# Javascript & jQuery Front End For Blogging API

## Objectives

By the end of this, students should be able to:

- Create a new user through ajax post requests
- Create a new post through ajax post requests
- Create a new category through ajax post requests
- Get all the posts in the API
- Get all the categories in the API
- Get all the users in the API

## Instructions

- Fork and clone
- Run `npm install`
- Run `bower install`
- Run `grunt serve`
- Clone/update this repo: [JWApi](https://github.com/fishermanswharff/JWApi)
- `cd` into the `JWApi`
- Run `bundle install`
- Run `rake db:setup`
- Run `rails s` to run the `JWApi` in a localhost
- Use this `curl` request to make sure the api is working properly: `curl -I http://localhost:3000/users`

## Bonus (Optional Section)

### Much bonus goes to anyone who implements AWS hosting for images on posts
**This API has an endpoint for an amazon signkey that you can use to post files/images/data to an S3 bucket. No gems, no paperclip!!**
Posts have images, one featured image, and one thumbnail image. Make this functionaility in the front end. You will need to setup your AWS account, apply for S3 service, configure your S3 service, and create an IAM account with the appropriate credentials.

Some resources for this:

- [AWS S3 Getting Started](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html)
- [Browser Uploads to S3 using HTML POST Forms](https://aws.amazon.com/articles/Amazon-S3/1434)

### Much more bonus goes to anyone who builds an image gallery for each post view.
### Much bonus goes to anyone who builds individual views for each post
### Show the categories for each post
### Much more bonus goes to anyone who implements a front-end templating library like [Handlebars](http://handlebarsjs.com/) or [Nunjucks](http://mozilla.github.io/nunjucks/)
### Build out the SASS Framework I've set you up with.

