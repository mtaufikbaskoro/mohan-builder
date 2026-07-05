import { getMonsters } from "@/services/monster"
import { Monster } from "@/types/monster"
import Content from "./content"

const Page = async () => {
  const monsters: Monster[] = await getMonsters()

  return <Content monsters={monsters} />
}

export default Page