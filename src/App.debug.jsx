import React, { useEffect, useState } from 'react'

function AppDebug() {
  const [apiStatus, setApiStatus] = useState('checking...');
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log('AppDebug component mounted');
    console.log('Environment:', import.meta.env.MODE);
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('WS URL:', import.meta.env.VITE_WS_URL);
    
    // Test API connection
    fetch('/api/health')
      .then(response => {
        console.log('API response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('API response data:', data);
        setApiData(data);
        setApiStatus('✅ Connected');
      })
      .catch(error => {
        console.error('API error:', error);
        setError(error.message);
        setApiStatus('❌ Failed');
      });
  }, []);

  console.log('AppDebug rendering with apiStatus:', apiStatus);

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#00e676', marginTop: 0 }}>🔧 AutoRL Debug Page</h1>
        <p style={{ fontSize: '18px', color: '#333' }}>✅ React is working!</p>
        
        <div style={{ 
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ marginTop: 0 }}>API Status: <span style={{ 
            color: apiStatus.includes('✅') ? '#00c853' : '#d32f2f' 
          }}>{apiStatus}</span></h3>
          
          {apiData && (
            <div style={{ marginTop: '15px' }}>
              <h4>API Response:</h4>
              <pre style={{ 
                backgroundColor: '#2d2d2d',
                color: '#00e676',
                padding: '15px',
                borderRadius: '4px',
                overflow: 'auto'
              }}>
                {JSON.stringify(apiData, null, 2)}
              </pre>
            </div>
          )}
          
          {error && (
            <div style={{ 
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#ffebee',
              color: '#d32f2f',
              borderRadius: '4px'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
        
        <div style={{ 
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          border: '1px solid #90caf9'
        }}>
          <h3 style={{ marginTop: 0 }}>🔍 Debug Info</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Environment:</td>
                <td style={{ padding: '8px' }}>{import.meta.env.MODE}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>API URL:</td>
                <td style={{ padding: '8px' }}>{import.meta.env.VITE_API_BASE_URL || 'Not set'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>WS URL:</td>
                <td style={{ padding: '8px' }}>{import.meta.env.VITE_WS_URL || 'Not set'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Base URL:</td>
                <td style={{ padding: '8px' }}>{import.meta.env.BASE_URL}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Current Path:</td>
                <td style={{ padding: '8px' }}>{window.location.pathname}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ 
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#fff3e0',
          borderRadius: '4px',
          border: '1px solid #ffb74d'
        }}>
          <h3 style={{ marginTop: 0 }}>📋 Next Steps</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>If you see this page, React is rendering correctly ✅</li>
            <li>Check the API Status above - it should show "Connected"</li>
            <li>Open Browser Console (F12) and check for any errors</li>
            <li>If API is failing, ensure backend is running: <code>python backend_server.py</code></li>
            <li>Once everything is working, switch back to the main App</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default AppDebug

