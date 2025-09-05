    import './App.css';

    function App() {
      return (
        <div className="App">
          <header>
            <h1>Admin Dashboard</h1>
            <p>Live Civic Issue Reports</p>
          </header>
          <main>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* We will add the report data here later */}
                <tr>
                  <td colSpan="3">No reports found.</td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
      );
    }

    export default App;
    
