// Helper function to reduce code complexity.
// If default is true. Render the component in a default style.
export default function TopRight(props){
    if(!props.default){
        return (props.children);
    }

    return (
        <span className='pr-2 text-center font-bold text-blue-800'>
            { props.children }
        </span>
    )
}
