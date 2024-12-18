'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RiShareForwardLine } from 'react-icons/ri';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

interface ShareButtonProps {
  url: string;
  title: string;
}

const PostShare: React.FC<ShareButtonProps> = ({ url, title }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-xs md:text-sm text-default-600 hover:text-blue-500 gap-1 rounded py-1 focus:outline-none border-none"
        >
          <RiShareForwardLine size={18} />
          Share
        </motion.button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Share options">
        <DropdownItem key="facebook">
          <FacebookShareButton url={url} title={`${title ? title : ''}`}>
            <div className="flex items-center gap-2">
              <FacebookIcon size={32} round />
              <span>Facebook</span>
            </div>
          </FacebookShareButton>
        </DropdownItem>
        <DropdownItem key="twitter">
          <TwitterShareButton url={url} title={title}>
            <div className="flex items-center gap-2">
              <TwitterIcon size={32} round />
              <span>Twitter</span>
            </div>
          </TwitterShareButton>
        </DropdownItem>
        <DropdownItem key="linkedin">
          <LinkedinShareButton url={url} title={title}>
            <div className="flex items-center gap-2">
              <LinkedinIcon size={32} round />
              <span>LinkedIn</span>
            </div>
          </LinkedinShareButton>
        </DropdownItem>
        <DropdownItem key="whatsapp">
          <WhatsappShareButton url={url} title={title}>
            <div className="flex items-center gap-2">
              <WhatsappIcon size={32} round />
              <span>WhatsApp</span>
            </div>
          </WhatsappShareButton>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostShare;
