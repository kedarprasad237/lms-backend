const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Topic = require('../models/Topic');

// Load environment variables
dotenv.config();

const topicsData = [
  {
    name: 'Algorithms',
    description: 'Core algorithmic concepts and problem-solving techniques',
    order: 1,
    subtopics: [
      {
        name: 'Sorting Algorithms',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=sorting',
        youtubeLink: 'https://www.youtube.com/watch?v=QN9hnmAgmOc',
        articleLink: 'https://www.geeksforgeeks.org/sorting-algorithms/',
        level: 'easy'
      },
      {
        name: 'Searching Algorithms',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=search',
        youtubeLink: 'https://www.youtube.com/watch?v=P3YID7liBug',
        articleLink: 'https://www.geeksforgeeks.org/searching-algorithms/',
        level: 'easy'
      },
      {
        name: 'Dynamic Programming',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=dynamic%20programming',
        youtubeLink: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
        articleLink: 'https://www.geeksforgeeks.org/dynamic-programming/',
        level: 'medium'
      },
      {
        name: 'Greedy Algorithms',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=greedy',
        youtubeLink: 'https://www.youtube.com/watch?v=ARvQcqJ_-NY',
        articleLink: 'https://www.geeksforgeeks.org/greedy-algorithms/',
        level: 'medium'
      },
      {
        name: 'Divide and Conquer',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=divide%20conquer',
        youtubeLink: 'https://www.youtube.com/watch?v=2Rr2tW9zvRg',
        articleLink: 'https://www.geeksforgeeks.org/divide-and-conquer-algorithm/',
        level: 'medium'
      },
      {
        name: 'Backtracking',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=backtracking',
        youtubeLink: 'https://www.youtube.com/watch?v=Zq4upTEaQyM',
        articleLink: 'https://www.geeksforgeeks.org/backtracking-algorithms/',
        level: 'hard'
      }
    ]
  },
  {
    name: 'Data Structures',
    description: 'Fundamental data structures and their implementations',
    order: 2,
    subtopics: [
      {
        name: 'Arrays',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=array',
        youtubeLink: 'https://www.youtube.com/watch?v=QJ1qWy4pX7g',
        articleLink: 'https://www.geeksforgeeks.org/array-data-structure/',
        level: 'easy'
      },
      {
        name: 'Linked Lists',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=linked%20list',
        youtubeLink: 'https://www.youtube.com/watch?v=Hj_rA0dhr2I',
        articleLink: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
        level: 'easy'
      },
      {
        name: 'Stacks and Queues',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=stack',
        youtubeLink: 'https://www.youtube.com/watch?v=wjI1WNcIntg',
        articleLink: 'https://www.geeksforgeeks.org/stack-data-structure/',
        level: 'easy'
      },
      {
        name: 'Trees',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=tree',
        youtubeLink: 'https://www.youtube.com/watch?v=oSWTXtMglKE',
        articleLink: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
        level: 'medium'
      },
      {
        name: 'Graphs',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=graph',
        youtubeLink: 'https://www.youtube.com/watch?v=09_LlHjoEiY',
        articleLink: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
        level: 'hard'
      },
      {
        name: 'Hash Tables',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=hash',
        youtubeLink: 'https://www.youtube.com/watch?v=shs0KM3wKv8',
        articleLink: 'https://www.geeksforgeeks.org/hashing-data-structure/',
        level: 'medium'
      }
    ]
  },
  {
    name: 'Databases',
    description: 'Database concepts, SQL, and NoSQL databases',
    order: 3,
    subtopics: [
      {
        name: 'SQL Basics',
        leetCodeLink: 'https://leetcode.com/problemset/database/',
        youtubeLink: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
        articleLink: 'https://www.w3schools.com/sql/',
        level: 'easy'
      },
      {
        name: 'Database Design',
        leetCodeLink: 'https://leetcode.com/problemset/database/',
        youtubeLink: 'https://www.youtube.com/watch?v=ztHopE5Wnpc',
        articleLink: 'https://www.geeksforgeeks.org/database-design/',
        level: 'medium'
      },
      {
        name: 'Indexing and Optimization',
        leetCodeLink: 'https://leetcode.com/problemset/database/',
        youtubeLink: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
        articleLink: 'https://www.geeksforgeeks.org/database-indexing/',
        level: 'hard'
      },
      {
        name: 'NoSQL Databases',
        leetCodeLink: 'https://leetcode.com/problemset/database/',
        youtubeLink: 'https://www.youtube.com/watch?v=uV3R0m1a3fQ',
        articleLink: 'https://www.geeksforgeeks.org/nosql-database/',
        level: 'medium'
      }
    ]
  },
  {
    name: 'Machine Learning',
    description: 'Machine learning algorithms and concepts',
    order: 4,
    subtopics: [
      {
        name: 'Linear Regression',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=linear%20regression',
        youtubeLink: 'https://www.youtube.com/watch?v=Hhy9F1ZJfzE',
        articleLink: 'https://www.geeksforgeeks.org/ml-linear-regression/',
        level: 'easy'
      },
      {
        name: 'Classification Algorithms',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=classification',
        youtubeLink: 'https://www.youtube.com/watch?v=Hhy9F1ZJfzE',
        articleLink: 'https://www.geeksforgeeks.org/classification-algorithms/',
        level: 'medium'
      },
      {
        name: 'Neural Networks',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=neural%20network',
        youtubeLink: 'https://www.youtube.com/watch?v=aircAruvnKk',
        articleLink: 'https://www.geeksforgeeks.org/introduction-to-neural-networks/',
        level: 'hard'
      },
      {
        name: 'Deep Learning',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=deep%20learning',
        youtubeLink: 'https://www.youtube.com/watch?v=aircAruvnKk',
        articleLink: 'https://www.geeksforgeeks.org/introduction-to-deep-learning/',
        level: 'hard'
      }
    ]
  },
  {
    name: 'Operating Systems',
    description: 'Core operating system concepts and principles',
    order: 5,
    subtopics: [
      {
        name: 'Process Management',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=process',
        youtubeLink: 'https://www.youtube.com/watch?v=9gdXvqS7yk8',
        articleLink: 'https://www.geeksforgeeks.org/operating-systems/',
        level: 'medium'
      },
      {
        name: 'Memory Management',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=memory',
        youtubeLink: 'https://www.youtube.com/watch?v=9gdXvqS7yk8',
        articleLink: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/',
        level: 'medium'
      },
      {
        name: 'File Systems',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=file%20system',
        youtubeLink: 'https://www.youtube.com/watch?v=9gdXvqS7yk8',
        articleLink: 'https://www.geeksforgeeks.org/file-systems-in-operating-system/',
        level: 'medium'
      },
      {
        name: 'Synchronization',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=synchronization',
        youtubeLink: 'https://www.youtube.com/watch?v=9gdXvqS7yk8',
        articleLink: 'https://www.geeksforgeeks.org/synchronization-in-operating-system/',
        level: 'hard'
      }
    ]
  },
  {
    name: 'Networks',
    description: 'Computer networking concepts and protocols',
    order: 6,
    subtopics: [
      {
        name: 'Network Protocols',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=network',
        youtubeLink: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
        articleLink: 'https://www.geeksforgeeks.org/computer-network-tutorials/',
        level: 'easy'
      },
      {
        name: 'TCP/IP',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=tcp',
        youtubeLink: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
        articleLink: 'https://www.geeksforgeeks.org/tcp-ip-model/',
        level: 'medium'
      },
      {
        name: 'HTTP/HTTPS',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=http',
        youtubeLink: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
        articleLink: 'https://www.geeksforgeeks.org/http-vs-https/',
        level: 'easy'
      },
      {
        name: 'Security',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=security',
        youtubeLink: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
        articleLink: 'https://www.geeksforgeeks.org/network-security/',
        level: 'hard'
      }
    ]
  },
  {
    name: 'Mathematics',
    description: 'Mathematical concepts for computer science',
    order: 7,
    subtopics: [
      {
        name: 'Number Theory',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=number%20theory',
        youtubeLink: 'https://www.youtube.com/watch?v=19SW3P_PaFA',
        articleLink: 'https://www.geeksforgeeks.org/number-theory/',
        level: 'medium'
      },
      {
        name: 'Combinatorics',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=combinatorics',
        youtubeLink: 'https://www.youtube.com/watch?v=19SW3P_PaFA',
        articleLink: 'https://www.geeksforgeeks.org/combinatorics/',
        level: 'medium'
      },
      {
        name: 'Probability',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=probability',
        youtubeLink: 'https://www.youtube.com/watch?v=19SW3P_PaFA',
        articleLink: 'https://www.geeksforgeeks.org/probability/',
        level: 'hard'
      },
      {
        name: 'Statistics',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=statistics',
        youtubeLink: 'https://www.youtube.com/watch?v=19SW3P_PaFA',
        articleLink: 'https://www.geeksforgeeks.org/statistics/',
        level: 'medium'
      }
    ]
  },
  {
    name: 'Software Engineering',
    description: 'Software development practices and methodologies',
    order: 8,
    subtopics: [
      {
        name: 'Design Patterns',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=design%20pattern',
        youtubeLink: 'https://www.youtube.com/watch?v=NU_1StN5Tkk',
        articleLink: 'https://www.geeksforgeeks.org/software-design-patterns/',
        level: 'medium'
      },
      {
        name: 'System Design',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=system%20design',
        youtubeLink: 'https://www.youtube.com/watch?v=NU_1StN5Tkk',
        articleLink: 'https://www.geeksforgeeks.org/system-design/',
        level: 'hard'
      },
      {
        name: 'Testing',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=testing',
        youtubeLink: 'https://www.youtube.com/watch?v=NU_1StN5Tkk',
        articleLink: 'https://www.geeksforgeeks.org/software-testing/',
        level: 'medium'
      },
      {
        name: 'Version Control',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=version%20control',
        youtubeLink: 'https://www.youtube.com/watch?v=NU_1StN5Tkk',
        articleLink: 'https://www.geeksforgeeks.org/version-control-systems/',
        level: 'easy'
      }
    ]
  },
  {
    name: 'Web Development',
    description: 'Frontend and backend web development technologies',
    order: 9,
    subtopics: [
      {
        name: 'HTML/CSS',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=html',
        youtubeLink: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
        articleLink: 'https://www.geeksforgeeks.org/web-development/',
        level: 'easy'
      },
      {
        name: 'JavaScript',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=javascript',
        youtubeLink: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
        articleLink: 'https://www.geeksforgeeks.org/javascript/',
        level: 'easy'
      },
      {
        name: 'React',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=react',
        youtubeLink: 'https://www.youtube.com/watch?v=DLX62G4lc44',
        articleLink: 'https://www.geeksforgeeks.org/reactjs/',
        level: 'medium'
      },
      {
        name: 'Node.js',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=nodejs',
        youtubeLink: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
        articleLink: 'https://www.geeksforgeeks.org/nodejs/',
        level: 'medium'
      }
    ]
  },
  {
    name: 'Cloud Computing',
    description: 'Cloud platforms and services',
    order: 10,
    subtopics: [
      {
        name: 'AWS',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=aws',
        youtubeLink: 'https://www.youtube.com/watch?v=3hLmDS179YE',
        articleLink: 'https://www.geeksforgeeks.org/amazon-web-services-aws/',
        level: 'medium'
      },
      {
        name: 'Azure',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=azure',
        youtubeLink: 'https://www.youtube.com/watch?v=3hLmDS179YE',
        articleLink: 'https://www.geeksforgeeks.org/microsoft-azure/',
        level: 'medium'
      },
      {
        name: 'Google Cloud',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=google%20cloud',
        youtubeLink: 'https://www.youtube.com/watch?v=3hLmDS179YE',
        articleLink: 'https://www.geeksforgeeks.org/google-cloud-platform/',
        level: 'medium'
      },
      {
        name: 'Docker',
        leetCodeLink: 'https://leetcode.com/problemset/all/?search=docker',
        youtubeLink: 'https://www.youtube.com/watch?v=3hLmDS179YE',
        articleLink: 'https://www.geeksforgeeks.org/docker/',
        level: 'hard'
      }
    ]
  }
];

const seedTopics = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing topics
    await Topic.deleteMany({});
    console.log('Cleared existing topics');

    // Insert new topics
    const topics = await Topic.insertMany(topicsData);
    console.log(`Seeded ${topics.length} topics successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding topics:', error);
    process.exit(1);
  }
};

// Run the seed function
seedTopics();


