const Header = () => {
    // bg-stone-950
    return (
        <div className="flex flex-row justify-between px-50 py-5 bg-red-800 relative">
            <p className="text-2xl font-semibold">II SCIQ</p>
            <div className="flex flex-row gap-x-5">
                <p className="text-lg">Apoio</p>
                <p className="text-lg">Sobre</p>
                <p className="text-lg">Informações</p>
            </div>
        </div>
    )
}

export default Header;