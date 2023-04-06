import { VictoryPie } from "victory";

export default function DoughnutChart(props) {
  let nutriments = props.nutriments;
  const data = [
    { x: " ", y: nutriments.carbohydrates },
    { x: " ", y: nutriments.fat },
    { x: " ", y: nutriments.proteins },
    { x: " ", y: nutriments.fiber },
    { x: " ", y: nutriments.sugars },
  ];
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <VictoryPie
        data={data}
        innerRadius={80}
        padding={90}
        colorScale={["rgb(255, 151, 48)", "rgb(94, 87, 81)", "#003aed", "#019300", "#f74bd7"]}
        animate={{ duration: 2000 }}
        responsive={true}
        padAngle={({ datum }) => datum.y*0.1}
      />
    </div>
  );
}
