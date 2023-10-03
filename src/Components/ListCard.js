import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useSelector } from 'react-redux';
export default function ListCard() {
  const language = useSelector((state) => state.language.value);
  const color = useSelector((state) => state.language.value2);
  return (
    <>
      <table align='center' width="100px">
        <tr>
          <td align='center'>
          <Card shadow="sm" padding="sm" radius="md" withBorder
          style={{marginTop:"80px",marginLeft:"30px",height:"300px",background:color === 'light' ? '#f2f2f2' : '#333'}}
          >

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} style={{color:"#36b036"}}>ePAY</Text>
       
      </Group>

      <Text size="sm"  style={{color:color=="dark"?"#d9d9d9":"black"}}>
      {language === 'english' ? 'The Online Payment Platform helps customers pay for government service fees, utilities, and retail purchases seamlessly by integrating it with our e-services and e-commerce platforms with high efficiency ' : 'የመስመር ላይ ክፍያ መድረክ ደንበኞች ከኢ-አገልግሎቶቻችን እና ከኢ-ኮሜርስ መድረኮች ጋር በማዋሃድ ለመንግስት አገልግሎት ክፍያዎች፣ ለፍጆታ እና ችርቻሮ ግዥዎች ያለችግር እንዲከፍሉ ያግዛል።'}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      {language === 'english' ? 'View more information' : 'ተጨማሪ መረጃ ይመልከቱ'}
      </Button>
    </Card>
          </td>
          <td>      <Card shadow="sm" padding="sm" radius="md" withBorder
          style={{marginTop:"80px",marginLeft:"30px",height:"300px",background:color === 'light' ? '#f2f2f2' : '#333'}}
          >

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} style={{color:"#36b036"}}>DATA MANAGER</Text>
      </Group>

      <Text size="sm" style={{color:color=="dark"?"#d9d9d9":"black"}}>
      {language === 'english' ? 'The Data Management Platform consists of an enterprise data hub, system for data inflow and outflow, databases, data marts and data warehouse as well as technology for data managements' : 'የአስተዳደር ፕላትፎርም የኢንተርፕራይዝ የመረጃ ማዕከል፣ የውሂብ ፍሰት እና መውጫ ስርዓት፣ የውሂብ ጎታዎች፣ የውሂብ ማርቶች እና የመረጃ ማከማቻ እንዲሁም የመረጃ አስተዳደር ቴክኖሎጂዎችን ያቀፈ ነው።'}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      {language === 'english' ? 'View more information' : 'ተጨማሪ መረጃ ይመልከቱ'}
      </Button>
    </Card></td>
        
            <td>      <Card shadow="sm" padding="sm" radius="md" withBorder
          style={{marginTop:"80px",marginLeft:"30px",height:"300px",background:color === 'light' ? '#f2f2f2' : '#333'}}
          >

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} style={{color:"#36b036"}}>MEASURE</Text>
      </Group>

      <Text size="sm" style={{color:color=="dark"?"#d9d9d9":"black"}}>
      {language === 'english' ? 'A web-based collaboration and productivity platform to design, plan, execute, measure and manage organizational strategy by linking a vision and mission to strategic priorities objectives, measures.' :'ራዕይን እና ተልዕኮን ከስትራቴጂካዊ ቀዳሚ ዓላማዎች ጋር በማገናኘት ድርጅታዊ ስትራቴጂን ለመንደፍ፣ ለማቀድ፣ ለማስፈጸም፣ ለመለካት እና ለማስተዳደር በድር ላይ የተመሰረተ ትብብር እና ምርታማነት መድረክ።'}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
      {language === 'english' ? 'View more information' : 'ተጨማሪ መረጃ ይመልከቱ'}
      </Button>
    </Card></td>
    
          </tr>
      </table>
    
    </>
    
  )
}
