// Helper function to reduce code complexity.
// If default is true. Render the component in a default style.
export default function BottomRight(props){
    if(!props.default){
        return (props.children);
    }

    return (
        <span className='pr-2 text-center font-bold text-red-500'>
            { props.children }
        </span>
    )
}
