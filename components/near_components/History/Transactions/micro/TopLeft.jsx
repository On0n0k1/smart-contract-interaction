// Helper function to reduce code complexity.
// If default is true. Render the component in a default style.
export default function TopLeft(props){
    if(!props.default){
        return (props.children);
    }

    return (
        <span className='pl-2 text-start font-bold'>
            { props.children }
        </span>
    )
}
