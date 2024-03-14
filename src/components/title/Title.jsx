/** 
 * 标题
 * @param {string} title - 标题
 */
export default function Title({title}) {
    return (
        <h2
            style={{
                borderLeft: "solid 6px red",
                paddingInline: "8px",
                width: "90vw",
                marginLeft: "5vw",
                fontSize: "1.2em"
            }}
        >
            {title}
        </h2>
    )
}