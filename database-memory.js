import { randomUUID } from "crypto"

export class DatabaseMemory{
#blusas = new Map()

list(search){
    return Array.from(this.#blusas.entries()).map((blusasArray) =>{
    // acessando primeira posição
        const id = blusasArray[0]
        const data = blusasArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(blusa => {
        if (search){
            return blusa.banda.includes(search)
        }
        return true
    })
}
create(blusa){
    const blusaId = randomUUID()
    this.#blusas.set(blusaId, blusa)
}
update(id, blusa){
    this.#blusas.set(id, blusa)
}
delete(id, blusa){
    this.#blusas.delete(id, blusa)
}
}