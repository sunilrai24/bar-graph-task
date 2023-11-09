import React, { useState } from "react";
import "./App.css";
import { BsArrowRight } from "react-icons/bs";
import { IoWaterSharp } from "react-icons/io5";
import { ImBin2 } from "react-icons/im";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Cell,
  Pie,
  Sector,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 5800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const circleData = [
  { name: "Group A", value: 700 },
  { name: "Group B", value: 400 },
  { name: "Group C", value: 300 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  console.log({props});
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  };
  return (
    <div className="container">
      <h2 className="title">
        Environment <BsArrowRight />
      </h2>
      <div className="enviromentSection">
        <div className="emissionSection">
          <div>Total Emissions</div>
          <div className="scopeSection">
            <div className="scope">
              <span className="line bg-blue"></span> Scope 1{" "}
              <span className="scopeNumber bg-blue">80</span>
            </div>
            <div className="scope">
              <span className="line bg-red"></span> Scope 2{" "}
              <span className="scopenumber2">100</span>
            </div>
            <div className="scope">
              <span className="line bg-yellow"></span> Scope 3{" "}
              <span className="scopenumber3">20</span>
            </div>
          </div>
          <div className="barChartSection">
            <PieChart width={300} height={250}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={circleData}
                cx={120}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <BarChart width={300} height={200} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                barSize={10}
                dataKey="pv"
                fill="hsl(149.74deg 46.56% 51.57%)"
              />
            </BarChart>
          </div>
        </div>
        <div className="scopeSectionGraph">
          <div className="scopeSection2">
            <div className="icon">
              <IoWaterSharp className="blue-color" />
            </div>
            <div>
              <h1>Water</h1>
              <p>
                <span>46</span> KL
              </p>
            </div>
          </div>
          <BarChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar barSize={10} dataKey="pv" fill="hsl(192.08deg 63.4% 46.08%)" />
          </BarChart>
        </div>
        <div className="scopeSectionGraph">
          <div className="scopeSection2">
            <div className="icon">
              <ImBin2 className="pink-color" />
            </div>
            <div>
              <h1>Waste</h1>
              <p>
                <span>46</span> MT
              </p>
            </div>
          </div>
          <BarChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
              barSize={10}
              dataKey="pv"
              fill="hsl(309.17deg 67.29% 58.04%)"
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
