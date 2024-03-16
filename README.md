# Diograph utils

## constructAndLoadRoom

Get loaded room object with just providing, address, client type and possible credentials

```
const roomClientType = "S3Client";
const address = "s3://my-bucket-name/my-room"
const credentials: S3ClientCredentials = {
  region: "eu-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
}

const room = await constructAndLoadRoom(address, roomClientType, {
  S3Client: {
    clientConstructor: S3Client,
    credentials,
  },
});
```
