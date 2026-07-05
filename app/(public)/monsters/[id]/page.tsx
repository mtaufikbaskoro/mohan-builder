import { getMonsterById } from "@/services/monster"
import { notFound } from "next/navigation"
import Content from "./content"

const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const monsterId = parseInt(id, 10)

  if (isNaN(monsterId)) notFound()

  const monster = await getMonsterById(monsterId)

  if (!monster) notFound()

  return <Content monster={monster} />
}

export default Page