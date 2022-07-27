// Helper function to reduce code complexity.
// If default is true. Render the component in a default style.
export default function BottomLeft(props){

    if(props.signer){
        return (
            <BottomLeft default={true}>
                By {props.signer}
            </BottomLeft>
        );
    }


    if(!props.default){
        return (props.children);
    }

    return (
        <span className='pl-2 text-start font-bold text-gray-500'>
            { props.children }
        </span>
    );
}
