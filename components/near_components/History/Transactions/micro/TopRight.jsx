// Helper function to reduce code complexity.
// If default is true. Render the component in a default style.
export default function TopRight(props){
    if(props.hash){
        return (<TopRight default={true}>
            <a
                href={"https://explorer.testnet.near.org/transactions/" + props.hash}
                target="_blank"
            >{("" + props.hash).substring(0, 8)}...</a>
        </TopRight>)
    }

    if(!props.default){
        return (props.children);
    }

    return (
        <span className='pr-2 text-center font-bold text-blue-800'>
            { props.children }
        </span>
    )
}
