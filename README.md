# Getting Started with Create React App

This project is an example of an `Image Uploader UI` with logic, using React | Typescript | AWS | S3 | TailwindCSS and few other dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### To make it work

In order to make this app works the user need to add a `.env` file with S3 credentials, or hardcode the values. The original `.env` file looks like this.

```
REACT_APP_BUCKET_NAME='<ur_bucket_name>'
REACT_APP_REGION='<ur_aws_chosen_region>'
REACT_APP_ACCESS_KEY_ID='<ur_access_key>'
REACT_APP_SECRET_ACCESS_KEY='<ur_secret_access_key>'
REACT_APP_S3_URL='<ur_s3_url>'
```
