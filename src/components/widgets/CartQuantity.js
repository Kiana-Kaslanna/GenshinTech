import { useState } from "react";

export default function CartQuantity(props) {

    // props
    const afterNumChange = props.afterNumChange
    afterNumChange ??= () => void 0

    // state
    const [num, setNum] = useState(props.num);

    // functions
    const onNumChange = (e) => {
        setNum(parseInt(e.target.value));
        afterNumChange(parseInt(e.target.value));
    }

    return (
        <div>
            <input value={num} onChange={onNumChange} type="number" min="1" />
        </div>
    );
}