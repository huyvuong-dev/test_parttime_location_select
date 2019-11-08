<?php
namespace Magenest\Location\Controller\Ajax;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\UpgradeDataInterface;
class District extends \Magento\Framework\App\Action\Action
{
    /** @var \Magento\Framework\View\Result\PageddFactory
    protected $resultPageFactory;
     */
    private $resultPageFactory;
    private $_curl;
    public function __construct(\Magento\Framework\HTTP\Client\Curl $curl,\Magento\Framework\App\Action\Context $context, \Magento\Framework\View\Result\PageFactory $resultPageFactory) {
        $this->resultPageFactory = $resultPageFactory;
        $this->_curl = $curl;
        parent::__construct($context);
    }
    public function execute()
    {

        $resultPage = $this->resultFactory->create(\Magento\Framework\Controller\ResultFactory::TYPE_JSON);
        $id = $this->getRequest()->getParam("id");
        $url = 'https://thongtindoanhnghiep.co/api/city/'.$id.'/district';
        $this->_curl->get($url);
        $response = $this->_curl->getBody();
        $resultArray = json_decode($response);
        return $resultPage->setData(
            [
                'resultArray' => $resultArray,
                "id" => $id
            ]
        );
    }
}