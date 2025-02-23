import "./css/filterColor.css"

const CheckboxLegendary = function (props) {
    return (
        <li><input type="checkbox" name="isLegendary" value="legendary" onClick={props.onClick}/>
       légendaire</li>
    )
}

export default CheckboxLegendary