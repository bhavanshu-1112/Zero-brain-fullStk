export function Input({placeholder, ref }: { placeholder:string, ref:any }) {
    return (<div>
        <input placeholder={placeholder} type="text" className="px-4 py-2 rounded p-2 m-2 inset-shadow-2xs border" ref={ref}></input>
    </div>)
}