import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import { Card } from "./components/Card"



const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=20"

function getIdFromUrl(url) {
    const parts = url.split("/").filter(Boolean)
    return parts[parts.length - 1]
}
function App() {
    const [pokemons, setPokemons] = useState([])
    const [status, setStatus] = useState("loading")

    useEffect(() => {
        async function loadPokemons() {
            try {
                setStatus("loading")
                const response = await axios.get(API_URL)
                const list = response.data.results.map((item) => ({
                    id: getIdFromUrl(item.url),
                    name: item.name,
                }))
                setPokemons(list)
                setStatus("success")
            } catch (error) {
                console.error(error)
                setStatus("error")
            }
        }
        loadPokemons()
    }, [])

    if (status === "loading") {
        return <p className="text-center mt-20 text-red-700 text-3xl">Загрузка</p>
    }
    if (status === "error") {
        return (
            <p className="text-center mt-20 text-red-700 text-3xl">
                Не удалось загрузить страницу
            </p>
        )
    }
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-10 text-4xl">Покемоны</h1>
            <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {pokemons.map((pokemon) => (
                    <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} />
                ))}
            </div>
        </div>
    )
}
export default App