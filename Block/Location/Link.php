<?php
namespace Magenest\Location\Block\Location;
class Link extends \Magento\Framework\View\Element\Template
{
    /**
     * Render block HTML.
     *
     * @return string
     */
    protected $_template = 'Magenest_Location::location_select.phtml';
    private $_curl;
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\Framework\HTTP\Client\Curl $curl,
        array $data = []
    ) {
        $this->_curl = $curl;
        parent::__construct(
            $context,
            $data
        );
    }
    protected function _toHtml()
    {
        if (false != $this->getTemplate()) {
            return parent::_toHtml();
        }
        return '<li><a ' . $this->getLinkAttributes() . ' >' . $this->escapeHtml($this->getLabel()) . '</a></li>';
    }


    public function getAllCityResponse()
    {
        $url = 'https://thongtindoanhnghiep.co/api/city';
        $this->_curl->get($url);
        $response = $this->_curl->getBody();
        //add more paramater = true in json_decode to convert object -> array
        //$resultArray = json_decode($response,true);
        $resultArray = json_decode($response);

        return $resultArray;
    }

}