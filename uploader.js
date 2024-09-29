#!/usr/bin/node

const { PrismaClient } = require('@prisma/client');
const { UploadClient } = require('@uploadcare/upload-client');
const fs = require('fs');
const path = require("path");

const prisma = new PrismaClient()

// Take the path to the video file as an argument, get info about it
const filePath = process.argv[2];

// Create an UploadClient instance
const client = new UploadClient({ publicKey: '7bde6aeb0d1fa5f2ec53'})

let result;

// Read file and upload the Buffer
fs.readFile(filePath, async (err, data) => {
  if (err) throw err;

  try {
    // Upload the Buffer directly
    result = await client.uploadFile(data, {
      name: path.basename(filePath),
      mimeType: "video/mp4",
      metadata: { type: 'Motion Event' },
      store: '0',  // mark for deletion after 24 hours
    });

    console.log('File uploaded successfully');
    console.log(result.uuid)

  async function main() {
    await prisma.security.update({
      where: {
        filename: filePath,
      },
      data: {
        filename: result.uuid,
      }
    })
  }

  main()
    .then(async () => {
      fetch("http://192.168.1.112:3000/api", {method: "POST", body: JSON.stringify({event: "motion"})})
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

  } catch (error) {
    console.error('Upload failed:', error);
  }
});
