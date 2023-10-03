import React from 'react';
import { Center, Text, Badge } from '@mantine/core';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#f0f0f0',
        padding: '20px 0',
        marginTop: '40px',
      }}
    >
      <Center>
        <Text size="sm">© 2023 Your Company. All rights reserved.</Text>
        <Badge variant="outline" color="blue" style={{ marginLeft: '10px' }}>
          Privacy Policy
        </Badge>
        <Badge variant="outline" color="blue" style={{ marginLeft: '10px' }}>
          Terms of Service
        </Badge>
      </Center>
    </footer>
  )
}
