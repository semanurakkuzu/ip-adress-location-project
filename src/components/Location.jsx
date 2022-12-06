import Iframe from 'react-iframe'
export default function Location(props) {
  return (
    <>
    <Iframe url={`https://www.openstreetmap.org/export/embed.html?bbox=${props.location}`}
    width="640px"
    height="320px"
    id=""
    className=""
    display="block"
    position="relative"/>
    </>
  );
}
