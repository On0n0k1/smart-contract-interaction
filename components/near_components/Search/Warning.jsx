// Used in Search component.
// If an error exists, it will become visible as a warning message.
export default function Warning(props){
    var message = props.message;

    if (message == "") {
        return (<p className="hidden"></p>);
    }

    return (
    <p className="
        text-red-500
        -py-2 px-2
        w-full
        text-left
        font-normal"
        id="warning">
        { message }
    </p>);

}