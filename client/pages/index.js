import Layout from '../components/Layout';
import axios from 'axios';
import withAdmin from './withAdmin';
import Link from 'next/link';
import { API } from '../config';

// 1. Pass 'categories' along with 'user' into the component props
const Admin = ({ user, categories }) => (
    <Layout>
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user && user.name}</p>
        <br />
        <div className="row">
            {/* Sidebar Navigation */}
            <div className="col-md-4">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link href="/admin/category/create">
                            <a className="nav-link">Create category</a>
                        </Link>
                    </li>
                </ul>
            </div>
            
            {/* Content Area - Displays categories fetched from API */}
            <div className="col-md-8">
                <h2>Existing Categories</h2>
                {categories && categories.length > 0 ? (
                    <ul className="list-group">
                        {categories.map((c, i) => (
                            <li key={i} className="list-group-item">
                                {c.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">No categories found. Click "Create category" to add one!</p>
                )}
            </div>
        </div>
    </Layout>
);

// 2. Attach getInitialProps directly to the Admin component
Admin.getInitialProps = async () => {
    try {
        const response = await axios.get(`${API}/categories`);
        return {
            categories: response.data
        };
    } catch (error) {
        console.error("Error fetching categories in Admin Dashboard:", error);
        return {
            categories: []
        };
    }
};

// 3. Keep exactly ONE default export protected by your Higher-Order Component
export default withAdmin(Admin);
