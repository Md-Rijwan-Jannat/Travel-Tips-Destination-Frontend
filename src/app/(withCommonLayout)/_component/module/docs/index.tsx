'use client';

import React, { useState } from 'react';
import DocumentCard from './documentCard';
import Link from 'next/link';
import Image from 'next/image';
import { SearchIcon } from 'lucide-react';

const Documents: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8; // Number of items to display per page

  // Example document data
  const documentItems = [
    {
      title: 'Extensions',
      link: 'https://developer.wordpress.org/plugins/', // WordPress plugin development documentation
      items: [
        'Follow up Emails',
        'Standard Post Format',
        'Social Server Setup',
        'Plugin Installation',
        'Subscription Model Setup',
        'Custom Shortcodes',
        'Theme Customization',
      ],
    },
    {
      title: 'Admin Panel',
      link: 'https://docs.djangoproject.com/en/stable/ref/contrib/admin/', // Django admin panel documentation
      items: [
        'Follow up Emails',
        'Standard Post Format',
        'Social Server Setup',
        'Plugin Installation',
        'Subscription Model Setup',
        'User Management',
        'Role Permissions',
        'Dashboard Analytics',
      ],
    },
    {
      title: 'Administration',
      link: 'https://www.serverworld.info/en/', // General server setup and configuration
      items: [
        'Follow up Emails',
        'Standard Post Format',
        'Social Server Setup',
        'Plugin Installation',
        'Subscription Model Setup',
        'Database Backup',
        'Server Configuration',
        'Security Settings',
      ],
    },
    {
      title: 'Online Documentation',
      link: 'https://readthedocs.org/', // Read the Docs documentation hosting
      items: [
        'Follow up Emails',
        'Standard Post Format',
        'Social Server Setup',
        'Plugin Installation',
        'Subscription Model Setup',
        'API Documentation',
        'User Guide',
        'FAQ',
      ],
    },
    {
      title: 'Code Syntax Highlight',
      link: 'https://prismjs.com/', // Prism.js for syntax highlighting
      items: [
        'Follow up Emails',
        'Standard Post Format',
        'Social Server Setup',
        'Plugin Installation',
        'Subscription Model Setup',
        'JavaScript Syntax',
        'CSS Syntax',
        'HTML Syntax',
      ],
    },
    {
      title: 'Getting Started',
      link: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web', // MDN Web Docs for web development basics
      items: [
        'Follow up Emails',
        'Standard Post Format',
        'Social Server Setup',
        'Plugin Installation',
        'Subscription Model Setup',
        'Installation Guide',
        'System Requirements',
        'Basic Configuration',
      ],
    },
    {
      title: 'Themes and Customization',
      link: 'https://developer.wordpress.org/themes/', // WordPress themes and customization
      items: [
        'Theme Installation',
        'Color Scheme Settings',
        'Custom CSS',
        'Widget Placement',
        'Homepage Layout',
        'Typography Settings',
        'Custom Logo',
      ],
    },
    {
      title: 'SEO and Marketing',
      link: 'https://moz.com/beginners-guide-to-seo', // Moz's Beginner's Guide to SEO
      items: [
        'SEO Optimization',
        'Meta Tag Setup',
        'Google Analytics',
        'Social Media Integration',
        'Email Marketing',
        'Keyword Research',
        'Content Strategy',
      ],
    },
    {
      title: 'User Management',
      link: 'https://firebase.google.com/docs/auth', // Firebase Authentication documentation
      items: [
        'Create New User',
        'User Roles',
        'Profile Settings',
        'Password Reset',
        'User Permissions',
        'Account Deactivation',
        'User Logs',
      ],
    },
    {
      title: 'E-commerce Setup',
      link: 'https://woocommerce.com/documentation/', // WooCommerce documentation for e-commerce
      items: [
        'Product Listings',
        'Pricing Rules',
        'Checkout Process',
        'Order Management',
        'Payment Gateway Integration',
        'Discount Codes',
        'Inventory Management',
      ],
    },
    {
      title: 'Support and Maintenance',
      link: 'https://support.zendesk.com/hc/en-us', // Zendesk support system documentation
      items: [
        'Customer Support Setup',
        'Live Chat Integration',
        'Ticketing System',
        'Knowledge Base',
        'Feedback Collection',
        'System Updates',
        'Bug Reporting',
      ],
    },
  ];

  // Filter document items based on search term
  const filteredDocuments = documentItems.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const displayedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="text-center mb-10 h-[60vh] mx-auto w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-default-700 flex items-center justify-center my-2 text-xs">
          <Link href={'/'}>Home</Link> &gt; Documents
        </p>
        <Image
          className="md:w-[350px]"
          src={'http://thetheme.io/thedocs/assets/img/vector/1.png'}
          width={500}
          height={500}
          alt="doc image"
        />
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search documents..."
          className="border rounded-full px-4 py-2 w-full md:w-1/2 border-default-200 text-default-900 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="-ml-9 mt-2 text-default-600" />
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {displayedDocuments.map((doc, index) => (
          <DocumentCard
            key={index}
            title={doc.title}
            items={doc.items}
            link={doc.link}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                  currentPage === pageNum
                    ? 'bg-default-300'
                    : 'hover:bg-default-200'
                }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
