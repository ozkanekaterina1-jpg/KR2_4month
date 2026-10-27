export function Card({ id, name }) {
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    return (
        <div className="border border-gray-400 p-3 text-center rounded-2xl ">
            <p>#{id}</p>
            <img src={imageUrl} alt={name} className="mx-auto" />
            <h2>{name}</h2>
        </div>
    )
}