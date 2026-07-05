import { getMonsterById } from "@/services/monster"
import { Monster } from "@/types/monster"
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

  let monster: Monster
  try {
    monster = await getMonsterById(monsterId)
  } catch {
    notFound()
  }

  return <Content monster={monster} />
}

export default Page