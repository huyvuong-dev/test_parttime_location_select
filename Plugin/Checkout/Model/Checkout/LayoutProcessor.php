<?php

namespace Magenest\Location\Plugin\Checkout\Model\Checkout;

use Magento\Customer\Api\AddressRepositoryInterface;

class LayoutProcessor
{
    /**
     * @param \Magento\Checkout\Block\Checkout\LayoutProcessor $subject
     * @param array $jsLayout
     * @return array
     */
    private $_customer;
    private $_customerSession;
    private $_addressRepositoryInterface;
    public function __construct(
        \Magento\Customer\Api\CustomerRepositoryInterface $customerRepositoryInterface,
        \Magento\Customer\Api\AddressRepositoryInterface $addressRepositoryInterface,
        \Magento\Customer\Model\Session $customerSession
    )
    {
        $this->_addressRepositoryInterface = $addressRepositoryInterface;
        $this->_customer = $customerRepositoryInterface;
        $this->_customerSession = $customerSession;
    }

    public function afterProcess(
        \Magento\Checkout\Block\Checkout\LayoutProcessor $subject,
        array $jsLayout
    )
    {
        $id = $this->_customerSession->getCustomer()->getId();
        if ($id){
            $addresses = $this->_customer->getById($id)->getAddresses();
            foreach ($addresses as $address){
                if ($address->isDefaultBilling()){
                    if (isset($_COOKIE['city'])){
                        $address->setCity($_COOKIE['city']);
                        $this->_addressRepositoryInterface->save($address);
                    }
                }

                if ($address->isDefaultShipping()){
                    if (isset($_COOKIE['city'])){
                        $address->setCity($_COOKIE['city']);
                        $this->_addressRepositoryInterface->save($address);
                    }
                }
            }
        }
        $cityElementTmpl = 'Magenest_Location/form/element/valid';
        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
        ['shippingAddress']['children']['shipping-address-fieldset']['children']['city']['config']['elementTmpl'] = $cityElementTmpl;
        if (isset($_COOKIE['ward']) && isset($_COOKIE['district']) && isset($_COOKIE['city'])){
            $city = $_COOKIE['city'];
            $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
            ['shippingAddress']['children']['shipping-address-fieldset']['children']['city']['value'] = $city;
        }

        return $jsLayout;
    }
}