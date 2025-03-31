// export default function InputComponent({type}){

//     return <div className="">
//         <input  className="border  box-border rounded-lg " type={type} ></input>
//     </div>
// }

// In your InputComponent
export default function InputComponent({ type, name, value, onChange, placeholder, className }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className} w-full px-3 py-2 border rounded-md focus:outline-none`}
      required
    />
  );
}