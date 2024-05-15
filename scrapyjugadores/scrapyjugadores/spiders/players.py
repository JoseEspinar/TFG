import scrapy 
from scrapy.item import Field
from scrapy.item import Item
from scrapy.selector import Selector
from scrapy.loader import ItemLoader

import random 
from time import sleep
from selenium import webdriver
from msedge.selenium_tools import Edge, EdgeOptions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

'''
options = EdgeOptions()
options.use_chromium = True
options.add_argument('--ignore-certificate-errors')
options.add_experimental_option('excludeSwitches', ['enable-logging'])

driver = Edge(executable_path='C:\\Users\\jose_\\OneDrive\\Escritorio\\tfg\\scrapyjugadores\\msedgedriver.exe', options=options)
wait = WebDriverWait(driver, 10)
driver.get('https://www.futbin.com/23/players?page=1&version=gold&pos_type=all')
# Esperar a que aparezca el elemento de la tabla
elemento_tabla = wait.until(EC.element_to_be_clickable((By.XPATH, '//tbody/tr')))
# Hacer clic en el elemento para revelar la información oculta
ActionChains(driver).move_to_element(elemento_tabla).click().perform()

#estadisticas = driver.find_elements_by_xpath('//tbody/tr/td[@colspan="20"]')
'''
#//tr[@style="display: table-row;"]

class Campos(Item):
    Aname = Field ()
    Brating = Field()
    Cpos = Field ()
    Dclub = Field () 
    Enation = Field()
    Fliga = Field ()
    Gprice = Field ()
    Hpierna = Field()
    Ipace = Field ()
    Jshooting = Field ()
    Kpassing = Field ()
    Ldribbling = Field ()
    Mdefending = Field ()
    Nphysicality = Field ()
    Raltura = Field ()
    Speso = Field ()
    



class Players(scrapy.Spider):
    name='players'
    allowed_domains = ['www.futbin.com', 'futbin.com']
    '''
    def start_requests(self):
        base_url = 'https://www.futbin.com/23/players?page={}&version=gold&pos_type=all'
        for page in range(1, 63):
            url = base_url.format(page)
            yield scrapy.Request(url, self.parse)
    '''
    start_urls=[
        'https://www.futbin.com/23/players?page=62&version=gold&pos_type=all'
    ]
    
    custom_settings={
    'FEEDS': {
        'jugadores.csv': {
            'format': 'csv',
            'encoding': 'utf-8',
        },
    },
    'ROBOTSTXT_OBEY': True,
    }

    def parse(self, response):
        players = response.xpath('//tbody/tr')
        for player in players:
            item = ItemLoader(item=Campos(), selector=player)
            
            # Agrega los atributos del jugador al ItemLoader
            item.add_xpath('Aname', './/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/a/text()')
            item.add_xpath('Brating', './/td[3]/span/text()')
            item.add_xpath('Gprice', './/td[6]/span/text()')
            item.add_xpath('Dclub', './/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/span/a[1]/@data-original-title')
            item.add_xpath('Enation', './/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/span/a[2]/@data-original-title')
            item.add_xpath('Fliga', './/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/span/a[3]/@data-original-title')
            item.add_xpath('Cpos', './/td/div[@class="font-weight-bold"]/text()')
            item.add_xpath('Hpierna', './/td[8]/text()')
            item.add_xpath('Raltura', './/td[16]/div[1]/text()')
            item.add_xpath('Speso', './/td/div[@style="font-size: 12px; "]/text()[2]')
            item.add_xpath('Ipace', './/td[10]/span/text()')
            item.add_xpath('Jshooting', './/td[11]/span/text()')
            item.add_xpath('Kpassing', './/td[12]/span/text()')
            item.add_xpath('Ldribbling', './/td[13]/span/text()')
            item.add_xpath('Mdefending', './/td[14]/span/text()')
            item.add_xpath('Nphysicality', './/td[15]/span/text()')
            
            # Carga y emite el ítem con todos los atributos del jugador
            yield item.load_item()
        '''
        # Imprimir la respuesta para verificar si hay algún problema en la obtención de la página
        print(response)
        
        #sel = Selector(response)
        item = ItemLoader(item=Campos(), response=response)

        item.add_xpath('aname','//tbody/tr/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/a/text()')
        item.add_xpath('rating','//tbody/tr/td[3]/span/text()')
        item.add_xpath('price','//tbody/tr/td[6]/span/text()') 
        item.add_xpath('club','//tbody/tr/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/span/a[1]/@data-original-title')
        item.add_xpath('nation','//tbody/tr/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/span/a[2]/@data-original-title')
        item.add_xpath('liga','//tbody/tr/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/span/a[3]/@data-original-title')
        item.add_xpath('pos','//tbody/tr/td/div[@class="font-weight-bold"]/text()')
        item.add_xpath('pierna','//tbody/tr/td[8]/text()')
        item.add_xpath('altura','//tbody/tr/td[16]/div[1]/text()')
        item.add_xpath('peso','//tbody/tr/td/div[@style="font-size: 12px; "]/text()[2]')
        item.add_xpath('pace','//tbody/tr/td[10]/span/text()')
        item.add_xpath('shooting','//tbody/tr/td[11]/span/text()')
        item.add_xpath('passing','//tbody/tr/td[12]/span/text()')
        item.add_xpath('dribbling','//tbody/tr/td[13]/span/text()')
        item.add_xpath('defending','//tbody/tr/td[14]/span/text()')
        item.add_xpath('physicality','//tbody/tr/td[15]/span/text()')
       

        yield item.load_item()
'''


    '''
        #item.add_xpath('accel','//tbody/tr/td/div/div[1]/div[3]/div[1]/div[2]/div/text()')
        #item.add_xpath('pace','//tbody/tr[@style="display: table-row;"]/td[@colspan="20"]/div/div[1]/div[1]/text()')
        #item.add_xpath('accel','//tbody/tr[@style="display: table-row;"]/td[@colspan="20"]/div/div[1]/div[3]/div[1]/div[2]/div/text()')
        item.add_xpath('pace','//div[@id="main-pace-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('accel','//div[@id="sub-acceleration-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('sprintSpeed','//div[@id="sub-sprintspeed-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('shooting','//div[@id="main-shooting-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('positioning','//div[@id="sub-positioning-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('finishing','//div[@id="sub-finishing-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('shotPower','//div[@id="sub-shotpower-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('longShot','//div[@id="sub-longshotsaccuracy-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('volleys','//div[@id="sub-volleys-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('penalties','//div[@id="sub-penalties-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('passing','//div[@id="main-passing-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('vision','//div[@id="sub-vision-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('crossing','//div[@id="sub-crossing-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('fkAccur','//div[@id="sub-freekickaccuracy-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('shortPass','//div[@id="sub-shortpassing-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('longPass','//div[@id="sub-longpassing-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('curve','//div[@id="sub-curve-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('dribbling','//div[@id="main-dribblingp-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('agility','//div[@id="sub-agility-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('balance','//div[@id="sub-balance-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('reactions','//div[@id="sub-reactions-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('ballControl','//div[@id="sub-ballcontrol-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('dribbling','//div[@id="sub-dribbling-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('composure','//div[@id="sub-composure-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('defending','//div[@id="main-defending-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('interceptions','//div[@id="sub-interceptions-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('headingAcc','//div[@id="sub-headingaccuracy-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('defAwar','//div[@id="sub-marking-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('standingTac','//div[@id="sub-standingtackle-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('slidingTackle','//div[@id="sub-slidingtackle-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('physicality','//div[@id="main-heading-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('jumping','//div[@id="sub-jumping-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('stamina','//div[@id="sub-stamina-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('strength','//div[@id="sub-strength-val-0"]/div[@class="stat_val"]/text()')
        item.add_xpath('aggression','//div[@id="sub-aggression-val-0"]/div[@class="stat_val"]/text()')
    
        yield item.load_item()
    '''


