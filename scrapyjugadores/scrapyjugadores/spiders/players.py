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

#//tr[@style="display: table-row;"]

class Campos(Item):
    Name = Field ()
    Rating = Field()
    Pos = Field ()
    Club = Field () 
    Nation = Field()
    Liga = Field ()
    Price = Field ()
    Pierna = Field()
    Pace = Field ()
    Shooting = Field ()
    Passing = Field ()
    Dribbling = Field ()
    Defending = Field ()
    Physicality = Field ()
    Altura = Field ()
    Peso = Field ()
    



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
            item.add_xpath('Name', './/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/a/text()')
            item.add_xpath('Rating', './/td[3]/span/text()')
            item.add_xpath('Price', './/td[6]/span/text()')
            item.add_xpath('Club', './/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/span/a[1]/@data-original-title')
            item.add_xpath('Nation', './/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/span/a[2]/@data-original-title')
            item.add_xpath('Liga', './/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/span/a[3]/@data-original-title')
            item.add_xpath('Pos', './/td/div[@class="font-weight-bold"]/text()')
            item.add_xpath('Pierna', './/td[8]/text()')
            item.add_xpath('Altura', './/td[16]/div[1]/text()')
            item.add_xpath('Peso', './/td/div[@style="font-size: 12px; "]/text()[2]')
            item.add_xpath('Pace', './/td[10]/span/text()')
            item.add_xpath('Shooting', './/td[11]/span/text()')
            item.add_xpath('Passing', './/td[12]/span/text()')
            item.add_xpath('Dribbling', './/td[13]/span/text()')
            item.add_xpath('Defending', './/td[14]/span/text()')
            item.add_xpath('Physicality', './/td[15]/span/text()')
            
            # Carga y emite el ítem con todos los atributos del jugador
            yield item.load_item()





