
// function now() {
//     const d = new Date().valueOf();
//     return d/1000;
// }


function time_span(timestamp) {
    const now = new Date();
    console.log("Now is ", now);
    const since = new Date(parseInt(timestamp)/1_000_000);
    console.log("Timestamp is ", since);

    const now_year = now.getFullYear();
    const since_year = since.getFullYear();

    const now_month = now.getMonth();
    const since_month = since.getMonth();

    const now_day = now.getDate();
    const since_day = since.getDate();

    const now_hour = now.getHours();
    const since_hour = since.getHours();

    const now_minute = now.getMinutes();
    const since_minute = since.getMinutes();

    const now_second = now.getSeconds();
    const since_second = since.getSeconds();

    if (now_year > since_year){
        console.log("Subtracting ", since_year , " from ", now_year);
        return {
            value: now_year - since_year,
            text: "years"
        }
    }

    if (now_month > since_month){
        console.log("Subtracting ", since_month, " from ", now_month);
        return {
            value: now_month - since_month,
            text: "months"
        }
    }

    if (now_day > since_day){
        console.log("Subtracting ", since_day, " from ", now_day);
        return {
            value: now_day - since_day,
            text: "days"
        }
    }

    if (now_hour > since_hour) {
        console.log("Subtracting ", since_hour, " from ", now_hour);
        return {
            value: now_hour - since_hour,
            text: "hours"
        }
    }

    if (now_minute > since_minute) {
        console.log("Subtracting ", since_minute, " from ", now_minute);
        return {
            value: now_minute - since_minute,
            text: "minutes"
        }
    }

    if (now_second > since_second) {
        console.log("Subtracting ", since_second, " from ", now_second);
        return {
            value: now_second - since_second,
            text: "second"
        }
    }

    return {
        value: "this",
        text: "second"
    }



}

// function time_span(timestamp){
//     console.log("Now is ", now());
//     console.log("Timestamp is ", timestamp/1_000_000_000);
//     const since_then = - ((parseInt(timestamp)/1_000_000_000) - now());
//     console.log("since_then is ", since_then);
//     const date = new Date(since_then);
    
//     const years = date.getFullYear();
//     const months = date.getMonth();
//     const days = date.getDate();
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();

//     if (years > 1970) {
//         return {
//             value: years - 1970,
//             text: "years"
//         };
//     }

//     if (months > 0) {
//         return {
//             value: months,
//             text: "months"
//         }
//     }

//     if (days > 0) {
//         return {
//             value: days,
//             text: "days"
//         }
//     }

//     if (hours > 0) {
//         return {
//             value: hours,
//             text: "hours"
//         }
//     }

//     if (minutes > 0) {
//         return {
//             value: minutes,
//             text: "minutes"
//         }
//     }

//     return {
//         value: seconds,
//         text: "seconds"
//     }
// }


// Helper function to reduce code complexity.
// If default is true. Render the component in a default style.
export default function BottomRight(props){

    if(props.timestamp){
        const time_since = time_span(props.timestamp);

        return (<BottomRight default={true}>{time_since.value} {time_since.text} ago</BottomRight>)
    }

    if(!props.default){
        return (props.children);
    }

    return (
        <span className='pr-2 text-center font-bold text-red-500'>
            { props.children }
        </span>
    )
}
