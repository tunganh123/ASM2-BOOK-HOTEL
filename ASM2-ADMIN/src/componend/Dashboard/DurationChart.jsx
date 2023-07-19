import React from 'react';
import { PieChart, Pie, Sector, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { getRandomColor } from '../../utils/helper';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DurationChart = ({ transaction }) => {
  let arr = []
  for (let index = 0; index < transaction?.length; index++) {
    if (arr.findIndex((it) => it.name == transaction[index].hotel.name) == -1) {
      arr.push({ name: transaction[index].hotel.name, value: 1 })
    } else {
      let indexitem = arr.findIndex((it) => it.name == transaction[index].hotel.name)
      let newitem = { name: transaction[index].hotel.name, value: arr[indexitem].value + 1 }
      arr[indexitem] = newitem;
    }
  }

  return (
    <>
      <div style={{ marginTop: "6rem" }}>
        <h1 style={{ textAlign: "center" }} >Chart transaction of hotels</h1>
        <PieChart width={300} height={300}>
          <Pie
            data={arr}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {arr.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index] ? COLORS[index] : getRandomColor()} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            iconType="circle"
          />
        </PieChart>
      </div>
    </>
  );

}
export default DurationChart