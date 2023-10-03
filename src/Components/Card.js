import { Card, Image, Text } from '@mantine/core';
import { Button } from '@mantine/core';
import {  useSelector } from "react-redux";
import { Carousel } from '@mantine/carousel';
import Typewritter from "typewriter-effect"
import { Box } from '@mantine/core';
export default function Cards(){
  const color = useSelector((state)=>state.language.value2)
  const language = useSelector((state)=>state.language.value)
    return <>
 

 <Carousel
 id='home'
      autoplay
      delay={3000} 
      style={{ width: '100%', maxWidth: '900px', margin: '0 auto', marginTop: '40px' }}
      height={300}
    >
      <Carousel.Slide>
        <Card 
          shadow="lg"
          padding="xl"
          component="a"
          style={{ height: '300px',backgroundColor:color=="dark"?"#666666":"white" }} // Set a fixed height for the slide
        >
          <Text weight={500} size="lg" mt="md" color='#00e64d'>
           {language=="english"?"Our Organizational Hierarchy":"ድርጅታዊ ተዋረድ"}
          </Text>
          <Text mt="xs" style={{color:color=="dark"?"#d9d9d9":"black"}} size="md">
            {language=="amharic"?"የኩባንያችን ድርጅታዊ ተዋረድ ትብብርን እና ቅልጥፍናን ለማሳደግ የተነደፈ ነው። በፒራሚዱ አናት ላይ የኩባንያውን ስትራቴጂያዊ አቅጣጫ የሚመሩ ባለራዕይ እና ተለዋዋጭ መሪዎቻችን አሉን። እንከን የለሽ አሠራሮችን ለማረጋገጥ የተለያዩ ክፍሎችን በመቆጣጠር ከኛ ቁርጠኛ የሥራ አስፈፃሚ ቡድን ጋር በቅርበት ይሰራሉ። ከስር፣ ችሎታ ያላቸው ሰራተኞቻችንን በስራቸው ውስጥ በመምራት እና በመደገፍ ችሎታ ያላቸው አስተዳዳሪዎቻችን እና ተቆጣጣሪዎቻችን አሉን። በአንድነት፣ የላቀ ውጤት ለማምጣት ቁርጠኛ የሆነ ጠንካራ እና የተዋሃደ የሰው ኃይል እንፈጥራለን።":" Our company's organizational hierarchy is designed to foster collaboration and efficiency. At the top of the pyramid, we have our visionary and dynamic leaders who steer the company's strategic direction. They work closely with our dedicated executive team, overseeing different departments to ensure seamless operations. Underneath, we have our skilled managers and supervisors, guiding and supporting our talented employees in their roles. Together, we form a strong and united workforce committed to achieving excellence."}
          </Text>
          <Button variant="filled" color="green" size="lg">
            {language=="english"?"View Details":"ዝርዝሮችን ይመልከቱ"}
          </Button>
        </Card>
      </Carousel.Slide>

      <Carousel.Slide>
        <Card

          shadow="lg"
          padding="xl"
          component="a"
          style={{ height: '300px', backgroundColor:color=="dark"?"#666666":"white" }} // Set a fixed height for the slide
        >
          <Text weight={500} size="lg" mt="md" color='#00e64d'>
            {language=="english"?"Diverse and Talented Teams at Work":"የተለያዩ እና ችሎታ ያላቸው ቡድኖች በስራ ላይ"}
          </Text>
          <Text mt="xs"  size="md" style={{color:color=="dark"?"#d9d9d9":"black"}}>
            {language=="amharic"?"የእኛ የተለያዩ እና ጎበዝ ቡድኖቻችን የኩባንያችን ልብ ናቸው። የግብይት ቡድናችን የእኛን የምርት ስም ለማስተዋወቅ እና ከደንበኞች ጋር ለመገናኘት ያለመታከት ይሰራል። የእኛ የፈጠራ ክፍል በፈጠራ ዲዛይኖች አማካኝነት ለሀሳቦቻችን ህይወት ያመጣል። የእኛ የሽያጭ ቡድን ከደንበኞች ጋር ጠንካራ ግንኙነቶችን ይገነባል, የንግድ እድገትን ያንቀሳቅሳል. የእኛ የምርምር እና ልማት ቡድን ፈር ቀዳጅ መፍትሄዎች። አንድ ላይ ሆነው, የትብብር ኃይል ይፈጥራሉ, ኩባንያችን በኢንዱስትሪው ውስጥ ጎልቶ እንዲታይ ያደርገዋል":"Our diverse and talented teams are the heart of our company. Our marketing team works tirelessly to promote our brand and connect with customers. Our creative department brings life to our ideas through innovative designs. Our sales team builds strong relationships with clients, driving business growth. Our research and development team pioneers groundbreaking solutions. Together, they form a collaborative force, making our company stand out in the industry"}
          </Text>
          <Button variant="filled" color="green" size="lg">
          {language=="english"?"View Details":"ዝርዝሮችን ይመልከቱ"}
          </Button>
        </Card>
      </Carousel.Slide>
      <Carousel.Slide>
        <Card
          shadow="lg"
          padding="xl"
          component="a"
          style={{ height: '300px',backgroundColor:color=="dark"?"#666666":"white"  }} // Set a fixed height for the slide
        >
          <Text weight={500} size="lg" mt="md" color='#00e64d'>
            {language=="english"?"Guiding Excellence":"የላቀ አመራር"}
          </Text>
          <Text mt="xs" color="dimmed" size="md" style={{color:color=="dark"?"#d9d9d9":"black"}}>
            {language=="amharic"?" ቡድኖቻቸውን ወደ የላቀ ደረጃ የሚመሩ ቁርጠኛ አስተዳዳሪዎቻችንን ያግኙ። የእኛ የሰው ኃይል አስተዳዳሪ የሰራተኞቻችንን እድገት በመደገፍ አወንታዊ የስራ አካባቢን ያረጋግጣል። የእኛ ኦፕሬሽኖች አስተዳዳሪ ሂደቶችን ያመቻቻል ፣ ውጤታማነትን ያረጋግጣል። የእኛ የፕሮጀክት አስተዳዳሪዎች ከፅንሰ-ሀሳብ እስከ ማጠናቀቂያ ድረስ የተሳካ ጅምር ይመራሉ ። የእኛ የደንበኞች አገልግሎት አስተዳዳሪዎች ከሁሉም በላይ የደንበኞችን እርካታ ቅድሚያ ይሰጣሉ. አንድ ላይ ሆነው ለድርጅታችን ስኬት የማይበገር መሰረት ይገነባሉ።":"  Discover our dedicated managers who guide their teams to excellence. Our HR manager ensures a positive work environment, supporting our employees' growth. Our operations manager optimizes processes, ensuring efficiency. Our project managers lead successful initiatives from conception to completion. Our customer service managers prioritize customer satisfaction above all. Together, they build a resilient foundation for our company's success."}
          </Text>
          <Button variant="filled" color="green" size="lg">
          {language=="english"?"View Details":"ዝርዝሮችን ይመልከቱ"}
          </Button>
        </Card>
      </Carousel.Slide>

    </Carousel>
    <Box maw={900} style={{ textAlign:"center",marginTop:"95px",margin:"0 auto"}}>
        <h1 style={{fontSize:"35",color:"black",position:"absolute",zIndex:"6"}}>
        <h1  style={{width:"290px",height:"70px",position:"absolute",zIndex:"5",marginLeft:"4px"}}>

       <Typewritter
       onInit={(type)=>{
          type.typeString("Perago").pauseFor(1000).deleteAll().typeString("Hierarchy").pauseFor(1000).deleteAll().typeString("Management").pauseFor(1000).deleteAll().start()
        }}
        options={{loop:true}}
        />
        </h1>
        </h1>
<h1 style={{textAlign:"center",background:"lightgreen",padding:"40px",opacity:"0.4",borderRadius:"40px",zIndex:"1"}}></h1>
      </Box>
    </>
}
