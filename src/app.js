import prisma from '../prisma/index.js'

async function main() {
  //express setup
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()