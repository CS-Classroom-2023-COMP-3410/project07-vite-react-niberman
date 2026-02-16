import { useState } from 'react';
import Counter from '../components/Counter';
import Card from '../components/Card';
import Button from '../components/Button';

function HomePage({ onNavigate }) {
    const [message, setMessage] = useState('Welcome to our React application!');
    const [showFeatures, setShowFeatures] = useState(false);

    // Callback function for Counter — child-to-parent communication
    const handleCountChange = (newCount) => {
        if (newCount > 5) {
            setMessage(`Counter is getting high: ${newCount}!`);
        } else {
            setMessage('Welcome to our React application!');
        }
    };

    // Features data for Card components
    const features = [
        {
            title: 'Component Reuse',
            description: 'Build reusable UI components that can be shared across pages.'
        },
        {
            title: 'Props & State',
            description: 'Pass data via props and manage local state with useState.'
        },
        {
            title: 'Side Effects',
            description: 'Use useEffect for data fetching, event listeners, and more.'
        }
    ];

    return (
        <div>
            <h1>Home Page</h1>

            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                <h2>{message}</h2>
                <p>This is a demonstration of a multi-page React application.</p>

                <div style={{ marginTop: '15px' }}>
                    <Button onClick={() => onNavigate('products')}>
                        View Products
                    </Button>
                </div>
            </div>

            <Counter initialValue={0} onCountChange={handleCountChange} />

            <div style={{ marginTop: '30px' }}>
                <Button
                    onClick={() => setShowFeatures(!showFeatures)}
                    variant="secondary"
                >
                    {showFeatures ? 'Hide Features' : 'Show Features'}
                </Button>

                {showFeatures && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        marginTop: '20px'
                    }}>
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                title={feature.title}
                                description={feature.description}
                                actions={[
                                    {
                                        label: 'Learn More',
                                        onClick: () => setMessage(`You clicked on ${feature.title}!`),
                                        variant: 'primary'
                                    }
                                ]}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;