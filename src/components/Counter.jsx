function Counter({value}) {
    const formattedValue = value?.toString().padStart(3, '0');

    return (
        <div className="font-digital rounded-md bg-purple-200 py-2 px-3 text-pink text-2xl flex items-center">
           {formattedValue}
        </div>
    )
}

export default Counter
