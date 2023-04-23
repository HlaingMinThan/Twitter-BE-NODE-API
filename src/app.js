const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  //express setup
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()