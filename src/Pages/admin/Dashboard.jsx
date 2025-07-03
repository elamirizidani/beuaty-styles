// import React from 'react';
// import { Row, Col, Card } from 'react-bootstrap';

// const AdminDashboard = () => {
//   return (
//     <div>
//       <h2 className="mb-4">Admin Dashboard</h2>
//       <Row>
//         <Col md={3}>
//           <Card className="text-center">
//             <Card.Body>
//               <Card.Title>Total Users</Card.Title>
//               <Card.Text className="display-6">120</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center">
//             <Card.Body>
//               <Card.Title>Total Products</Card.Title>
//               <Card.Text className="display-6">45</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center">
//             <Card.Body>
//               <Card.Title>Total Orders</Card.Title>
//               <Card.Text className="display-6">89</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={3}>
//           <Card className="text-center">
//             <Card.Body>
//               <Card.Title>Total Revenue</Card.Title>
//               <Card.Text className="display-6">$5,230</Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default AdminDashboard;




import React, { useEffect, useState } from 'react';
import { Card, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { fetchData } from '../../../utilty/data/api';
Chart.register(...registerables);

const AdminDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    sales: { totalRevenue: 0, totalOrders: 0, salesTrend: [], topProducts: [] },
    customers: { newUsers: [], userPreferences: { hairTypes: [], skinTypes: [] }, activeUsers: [] },
    productSuggestions: []
  });


  const getAnalysis =async()=>{
    try {
      const res = await fetchData('admin/analytics')
setAnalyticsData(res)
    } catch (error) {
      console.log(error)
    }
  }

  // Load your data
  useEffect(() => {
    // setAnalyticsData({
    //   sales: {
    //     totalRevenue: 63.96,
    //     totalOrders: 2,
    //     salesTrend: [],
    //     topProducts: [
    //       { _id: "Hydrating Shampoo", totalSold: 4, revenue: 63.96 }
    //     ]
    //   },
    //   customers: {
    //     newUsers: [
    //       { _id: "2025-06-10", count: 1 },
    //       { _id: "2025-07-03", count: 1 }
    //     ],
    //     userPreferences: {
    //       _id: null,
    //       hairTypes: ["curly"],
    //       skinTypes: ["dry"]
    //     },
    //     activeUsers: [
    //       { name: "IShimwe amir", email: "elamirizidani@gmail.com", purchaseCount: 2 },
    //       { name: "amiri I", email: "amiri@igihe.rw", purchaseCount: 0 },
    //       { name: "william wale", email: "williamwale@gmail.com", purchaseCount: 0 },
    //       { name: "Admin Admin", email: "test@admin.com", purchaseCount: 0 }
    //     ]
    //   },
    //   productSuggestions: []
    // });

    getAnalysis()
  }, []);

  // Sales Chart Data
  const salesChartData = {
    labels: analyticsData.sales.topProducts.map(p => p._id),
    datasets: [{
      label: 'Revenue ($)',
      data: analyticsData.sales.topProducts.map(p => p.revenue),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  // Customer Preference Data
  const preferenceData = {
    labels: [
      ...analyticsData.customers.userPreferences.hairTypes,
      ...analyticsData.customers.userPreferences.skinTypes
    ],
    datasets: [{
      data: [
        analyticsData.customers.userPreferences.hairTypes.length, // Weighted value
        analyticsData.customers.userPreferences.skinTypes.length
      ],
      backgroundColor: [
        'rgba(255, 159, 64, 0.7)', // Hair color
        'rgba(54, 162, 235, 0.7)'  // Skin color
      ]
    }]
  };

  // New Users Timeline
  const newUsersData = {
    labels: analyticsData.customers.newUsers.map(u => u._id),
    datasets: [{
      label: 'New Users',
      data: analyticsData.customers.newUsers.map(u => u.count),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Analytics Dashboard</h2>
      
      {/* Sales Overview */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Sales Overview</Card.Title>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <h6>Total Revenue</h6>
                  <h4>${analyticsData.sales.totalRevenue.toFixed(2)}</h4>
                </div>
                <div>
                  <h6>Total Orders</h6>
                  <h4>{analyticsData.sales.totalOrders}</h4>
                </div>
              </div>
              {analyticsData.sales.topProducts.length > 0 ? (
                <Bar 
                  data={salesChartData} 
                  options={{ 
                    responsive: true, 
                    scales: { y: { beginAtZero: true } }
                  }}
                  height={100}
                />
              ) : (
                <div className="text-muted p-4 text-center">No sales data available</div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Top Products</Card.Title>
              <ListGroup variant="flush">
                {analyticsData.sales.topProducts.map((product, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between">
                    <span>{product._id}</span>
                    <Badge bg="success">${product.revenue.toFixed(2)}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Customer Acquisition */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Customer Demographics</Card.Title>
              <div className="mb-3">
                <h6>Total New Users</h6>
                <h4>{analyticsData.customers.newUsers.reduce((sum, user) => sum + user.count, 0)}</h4>
              </div>
              {analyticsData.customers.userPreferences.hairTypes.length > 0 ? (
                <>
                  <Pie 
                    data={preferenceData} 
                    options={{ responsive: true }}
                    height={60}
                  />
                  <small className="text-muted">Customer Preferences</small>
                </>
              ) : (
                <div className="text-muted p-4 text-center">No preference data</div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>User Activity</Card.Title>
              <div className="mb-3">
                <Line 
                  data={newUsersData} 
                  options={{ responsive: true }}
                  height={150}
                />
                <small className="text-muted">New Users Timeline</small>
              </div>
              <h6 className="mt-3">Most Active Users</h6>
              <ListGroup variant="flush">
                {analyticsData.customers.activeUsers
                  .filter(user => user.purchaseCount > 0)
                  .map((user, index) => (
                    <ListGroup.Item key={index}>
                      <div className="d-flex justify-content-between">
                        <span>{user.name}</span>
                        <Badge bg="info">{user.purchaseCount} purchases</Badge>
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Product Suggestions (Empty State) */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Product Opportunities</Card.Title>
              {analyticsData.productSuggestions.length > 0 ? (
                <ListGroup variant="flush">
                  {analyticsData.productSuggestions.map((item, index) => (
                    <ListGroup.Item key={index}>{item}</ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-muted p-4 text-center">
                  No AI suggestions yet. More user data will generate recommendations.
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;