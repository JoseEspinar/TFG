import scrapy 
from scrapy.item import Field
from scrapy.item import Item
from scrapy.selector import Selector
from scrapy.loader import ItemLoader

class Campos(Item):
    id = Field ()
    aname = Field()
    estadisticas = Field()
    pos = Field()
    ver = Field()
    price = Field()
    peso = Field ()


class Players(scrapy.Spider):
    name='players'
    allowed_domains = ['www.futbin.com', 'futbin.com']
    start_urls=[
        'https://www.futbin.com/23/players'
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
        # Imprimir la respuesta para verificar si hay algún problema en la obtención de la página
        print(response)
        
        sel = Selector(response)
        table = sel.xpath('//table[@id="repTb"]/tbody')
        for i, elem in enumerate(table):
            item = ItemLoader(Campos(),elem)
            item.add_xpath('aname', './/tr/td[@class="table-row-text row"]/div[@class="d-inline pt-2 pl-3"]/div/a/text()')
            item.add_xpath('estadisticas', './/tr/td/span/text()')
            item.add_xpath('pos', './/tr/td/div[@class="font-weight-bold"]/text()')
            item.add_xpath('ver', './/tr/td[@class="mobile-hide-table-col"]/div/text()')
            item.add_xpath('ver', './/tr/td[@class="mobile-hide-table-col"]/div/a/text()')
            item.add_xpath('price', './/tr/td/span[@class=" font-weight-bold"]/text()')
            item.add_xpath('peso', './/tr/td/div[@style="font-size: 12px; "]/text()')
            item.add_value('id',i)
            yield item.load_item()
